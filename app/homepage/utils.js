export function filterData(modules, search) {
  return modules.filter((module) => {
    return module.title.toLowerCase().includes(search.toLowerCase());
  });
}
