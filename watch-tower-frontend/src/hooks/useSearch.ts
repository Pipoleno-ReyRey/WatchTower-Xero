/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

type Filters = Record<string, string | number | boolean | undefined>;

export const useSearch = <T extends Record<string, any>>(data?: T[]) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({});

  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    const term = search.toLowerCase();

    return data.filter((item) => {
      // 🔎 búsqueda por texto
      const matchesSearch =
        !term ||
        Object.values(item).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(term),
        );

      // 🎯 filtros
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const itemValue = item[key];

        return String(itemValue) === String(value);
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, search, filters]);

  return {
    search,
    setSearch,
    filters,
    setFilter,
    filteredData,
  };
};
