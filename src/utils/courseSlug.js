// Turns a course code into a URL-safe slug and back-compatible matcher.
// "CSCI 1010U" -> "csci-1010u"
// So that course card link and the detail page always match.

export function toCourseSlug(code) {
  return code.trim().toLowerCase().replace(/\s+/g, "-");
}

export function findCourseBySlug(courses, slug) {
  const target = slug.toLowerCase();
  return courses.find((course) => toCourseSlug(course.code) === target);
}
