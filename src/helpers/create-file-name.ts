import { TNameOption } from "../atoms/filter-form-atoms";

export const createFileName = (
  name: string,
  nameOption: TNameOption,
  customName: string,
) => {
  const type = name.split(".").at(-1);

  switch (nameOption) {
    case "default": {
      return `filtered.${type}`;
    }
    case "file-name": {
      return name;
    }
    case "custom-with-file-name": {
      const cleanName = name.split(".").slice(0, -1).join(".");
      return `${customName}-${cleanName}.${type}`;
    }
    case "custom": {
      return `${customName}.${type}`;
    }
  }
};
