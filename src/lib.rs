#![deny(clippy::all)]

use klippa::{parse_drop_tables, parse_unicodes, populate_gids, subset_font, Plan, SubsetFlags};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use read_fonts::{collections::IntSet, types::NameId, FontRef};

#[napi(object)]
pub struct SubsetOptions {
  pub text: String,
}

fn convert_text_to_unicodes(text: &str) -> String {
  let mut out = String::new();
  for c in text.chars() {
    let code = format!("{:x}", c as u32);
    if out.is_empty() {
      out.push_str(&code);
    } else {
      out.push_str(&format!(",{}", code));
    }
  }
  out
}

#[napi]
pub fn subset(buf: Buffer, opts: SubsetOptions) -> Buffer {
  let font_buf: Vec<u8> = buf.into();
  let font = FontRef::new(&font_buf).expect("Error reading font bytes");
  let emtpy_str: &str = "";

  let gids = match populate_gids(emtpy_str) {
    Ok(gids) => gids,
    Err(e) => {
      eprintln!("{e}");
      std::process::exit(1);
    }
  };

  let text: &str = opts.text.as_str();
  let unicodes = match parse_unicodes(convert_text_to_unicodes(text).as_str()) {
    Ok(unicodes) => unicodes,
    Err(e) => {
      eprintln!("{e}");
      std::process::exit(1);
    }
  };

  let mut subset_flags = SubsetFlags::default();
  // subset_flags |= SubsetFlags::SUBSET_FLAGS_NO_HINTING;
  subset_flags |= SubsetFlags::SUBSET_FLAGS_RETAIN_GIDS;
  // subset_flags |= SubsetFlags::SUBSET_FLAGS_DESUBROUTINIZE;
  subset_flags |= SubsetFlags::SUBSET_FLAGS_NOTDEF_OUTLINE;
  // subset_flags |= SubsetFlags::SUBSET_FLAGS_GLYPH_NAMES;
  // subset_flags |= SubsetFlags::SUBSET_FLAGS_SET_OVERLAPS_FLAG;
  // subset_flags |= SubsetFlags::SUBSET_FLAGS_PASSTHROUGH_UNRECOGNIZED;

  let drop_tables = match parse_drop_tables(emtpy_str) {
    Ok(drop_tables) => drop_tables,
    Err(e) => {
      eprintln!("{e}");
      std::process::exit(1);
    }
  };

  let mut default_name_ids = IntSet::<NameId>::empty();
  default_name_ids.insert_range(NameId::from(0)..=NameId::from(6));

  let mut default_name_languages = IntSet::<u16>::empty();
  default_name_languages.insert(0x0409);

  let plan = Plan::new(
    &gids,
    &unicodes,
    &font,
    subset_flags,
    &drop_tables,
    &default_name_ids,
    &default_name_languages,
  );

  let output_bytes: Vec<u8>;

  match subset_font(&font, &plan) {
    Ok(out) => {
      output_bytes = out;
    }
    Err(e) => {
      eprintln!("{e}");
      std::process::exit(1);
    }
  };

  return output_bytes.as_slice().into();
}
