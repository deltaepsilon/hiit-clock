export default async function wait(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
