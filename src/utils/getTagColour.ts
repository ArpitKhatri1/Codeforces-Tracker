export default function getTagColour(rating: number) {
  if (rating < 900) return "bg-gray-500"; // Newbie
  if (rating < 1200) return "bg-green-500"; // Pupil
  if (rating < 1400) return "bg-teal-500"; // Specialist
  if (rating < 1600) return "bg-blue-500"; // Expert
  if (rating < 1900) return "bg-purple-500"; // Candidate Master
  if (rating < 2100) return "bg-orange-500"; // Master
  return "bg-red-500"; //
}
