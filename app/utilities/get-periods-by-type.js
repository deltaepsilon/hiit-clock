export default ({ periods = [] }, acceptedType) =>
  periods.filter(({ type }) => type == acceptedType);
