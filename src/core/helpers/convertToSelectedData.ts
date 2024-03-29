export const convertToSelectedRender = (data: unknown[]): { id: string; name: string }[] => {
  const dataSelected: { id: string; name: string }[] = [];

  data.forEach((item: { id: string; name: string }) => {
    dataSelected.push({ id: item?.id?.toString() ?? '', name: item?.name?.toString() ?? '' });
  });

  return dataSelected;
};
