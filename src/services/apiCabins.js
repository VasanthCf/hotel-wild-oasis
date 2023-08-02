import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

// GET ALL THE CABIN DATA .......................................................................
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
// DELETE THE SELECTED CABIN.........................................................................
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
// USED FOR EDITING or ADDING CABIN DATA TO SUPABASE................................................................
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //createCabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.CREATE/EDIT cabin****
  let query = supabase.from("cabins");

  // A) CREATE***
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) UPDATE***
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be creates");
  }
  //upload image
  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // delete the cabin if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and failed to create a cabin"
    );
  }
  return data;
}
