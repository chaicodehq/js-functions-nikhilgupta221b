/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  let festivals = [];

  const addFestival = (name, date, type) => {
    if (name.length === 0 || typeof date !== "string") {
      return -1;
    }

    const types = ["religious", "national", "cultural"];
    if (!types.includes(type)) {
      return -1;
    }

    const alreadyPresent = festivals.some((fest) => fest.name === name);
    if (alreadyPresent) {
      return -1;
    } else {
      festivals.push({ name, date, type });
    }

    return festivals.length;
  };

  const removeFestival = (name) => {
    const festival = festivals.find((fest) => fest.name === name);
    if (festival === undefined) {
      return false;
    } else {
      festivals = festivals.filter((fest) => fest.name !== name);
    }
    return true;
  };

  const getAll = () => {
    return [...festivals];
  };

  const getByType = (type) => {
    const filteredFestivals = festivals.filter((fest) => fest.type === type);
    return filteredFestivals;
  };

  const getUpcoming = (currentDate, n = 3) => {
    const filteredFestivals = festivals.filter(
      (fest) => fest.date > currentDate,
    );
    filteredFestivals.sort((festA, festB) =>
      festA.date.localeCompare(festB.date),
    );

    return filteredFestivals.slice(0, n);
  };

  const getCount = () => {
    return festivals.length;
  };

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount,
  };
}
