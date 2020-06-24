export const getDefaultParams = (config, type) => {
  return config
    .find(item => item.type === type)
    .params.map(item => ({
      name: item.name,
      type: item.type,
      value: item.defaultValue,
    }))
}
