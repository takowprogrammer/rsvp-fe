import { redirect } from "next/navigation";

export default function WeddingPartyPage() {
  // Redirect the old Wedding Party route to the new Wish List page
  redirect("/wishlist");
}