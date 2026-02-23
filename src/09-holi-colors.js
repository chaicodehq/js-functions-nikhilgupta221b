/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  if (!color1 || !color2) {
    return null;
  }
  const name = `${color1.name}-${color2.name}`;

  const rRound = Math.round((color1.r + color2.r) / 2);

  return {
    name: `${color1.name}-${color2.name}`,
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  };
}

export function adjustBrightness(color, factor) {
  if (!color || typeof factor !== "number") {
    return null;
  }
  let newR = color.r * factor;
  let newG = color.g * factor;
  let newB = color.b * factor;

  if (newR < 0) {
    newR = 0;
  } else if (newR > 255) {
    newR = 255;
  } else {
    newR = Math.round(newR);
  }
  if (newG < 0) {
    newG = 0;
  } else if (newG > 255) {
    newG = 255;
  } else {
    newG = Math.round(newG);
  }
  if (newB < 0) {
    newB = 0;
  } else if (newB > 255) {
    newB = 255;
  } else {
    newB = Math.round(newB);
  }
  return {
    name: color.name,
    r: newR,
    g: newG,
    b: newB,
  };
}

export function addToPalette(palette, color) {
  if (!color) {
    return [...palette];
  }
  if (!Array.isArray(palette)) {
    return [color];
  }
  let newPalette = [...palette];
  newPalette.push(color);
  return newPalette;
}

export function removeFromPalette(palette, colorName) {
  if (!Array.isArray(palette)) {
    return [];
  }

  const newPalette = palette.filter((col) => col.name !== colorName);
  return newPalette;
}

export function mergePalettes(palette1, palette2) {
  if (!Array.isArray(palette1)) {
    palette1 = [];
  }
  if (!Array.isArray(palette2)) {
    palette2 = [];
  }

  let newPalette = [];

  const addUnique = (palette) => {
    for (const colObj of palette) {
      const isDuplicate = newPalette.some((item) => item.name === colObj.name);
      if (!isDuplicate) {
        newPalette.push(colObj);
      }
    }
  };

  addUnique(palette1);
  addUnique(palette2);

  return newPalette;
}
