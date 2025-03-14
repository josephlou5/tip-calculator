/** Represents a version number as its parts. */
export type VersionNumber = number[];

/** The change description of a version. */
export type Description = {
  text: string;
  children?: Description[];
};

/** Represents a version. */
export type Version = {
  version: VersionNumber;
  timestamp: string;
  description: Description[];
};

/** All the changes, sorted by decreasing version number. */
export const CHANGELOG: Version[] = [
  {
    version: [0, 1],
    timestamp: "2025-03-13 21:57",
    description: [{ text: "Initial release" }],
  },
  {
    version: [0, 2],
    timestamp: "2025-03-13 23:50",
    description: [
      { text: "Added dynamic changelog" },
      { text: "Added breadcrumbs" },
    ],
  },
  {
    version: [0, 3],
    timestamp: "2025-03-14 00:06",
    description: [
      {
        text: "Fixed breadcrumbs",
        children: [
          {
            text:
              "GitHub Pages was doing funny stuff with regard to the " +
              "configured base path. The breadcrumbs didn't work as expected " +
              "due to this.",
          },
        ],
      },
    ],
  },
  {
    version: [1, 0],
    timestamp: "2025-03-14 13:06",
    description: [
      {
        text: "Added working tip calculator",
        children: [
          {
            text:
              "Input an amount to get a range of tip values and their " +
              "corresponding percentages.",
          },
          {
            text:
              "Additional tips will also be shown which result in a whole " +
              "dollar total.",
          },
        ],
      },
    ],
  },
  {
    version: [1, 1],
    timestamp: "2025-03-14 13:36",
    description: [
      {
        text: "Fixed Home breadcrumb link",
        children: [
          {
            text: "Would be ideal if I didn't have to hardcode the GitHub link",
          },
        ],
      },
    ],
  },
  {
    version: [1, 2],
    timestamp: "2025-03-14 14:08",
    description: [{ text: "Added footer with GitHub link" }],
  },
  {
    version: [1, 3],
    timestamp: "2025-03-14 14:33",
    description: [
      {
        text: "Added responsiveness",
        children: [
          { text: "The content is centered when the screen size is smaller." },
        ],
      },
    ],
  },
].sort((v1, v2) => -cmpVersions(v1.version, v2.version));

/** Returns the current version number as a string. */
export function getCurrentVersion(): string {
  let currVersion: VersionNumber = [];
  for (const version of CHANGELOG) {
    if (cmpVersions(version.version, currVersion) > 0) {
      currVersion = version.version;
    }
  }
  return versionToString(currVersion);
}

/** Compares two versions. */
function cmpVersions(version1: VersionNumber, version2: VersionNumber): number {
  for (let i = 0; i < Math.max(version1.length, version2.length); i++) {
    const v1 = version1[i] ?? 0;
    const v2 = version2[i] ?? 0;
    if (v1 < v2) return -1;
    if (v1 > v2) return 1;
  }
  return 0;
}

/** Converts a version to its string representation. */
export function versionToString(version: VersionNumber): string {
  if (version.length === 0) return "";
  return "v" + version.join(".");
}
