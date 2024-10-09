const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking').default;
export default function clearCookies() {
  return new Promise((success) => {
    RCTNetworking.clearCookies(success);
  });
}
