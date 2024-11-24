const formatUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  return url;
};

export default formatUrl;
