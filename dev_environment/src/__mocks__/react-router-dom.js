const reactRouterDom = jest.requireActual('react-router-dom');

const useHistory = jest.fn();

module.exports = {
  ...reactRouterDom,
  useHistory,
};