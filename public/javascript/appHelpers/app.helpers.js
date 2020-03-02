exports.buildErrorMessage = errorStatus => {
  switch (errorStatus) {
    case 426:
      return 'Out of results';
    case 404:
      return 'Page not found';
    default:
      return 'Sorry, Something went wrong';
  }
};

exports.pageNavigation = (page, content) => {
  const nextPage = +page <= content.data.totalResults ? +page + 1 : +page;
  const previousPage = +page > 1 ? +page - 1 : 0;
  const notFirstPage = previousPage !== 0;
  return {
    nextPage,
    previousPage,
    notFirstPage
  };
};
