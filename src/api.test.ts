import * as Api from "./api";

describe("Api", () => {
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe("get", () => {
    it("gets with query params", () => {
      Api.get("/path", { foo: "bar" });
      expect(window.fetch).toHaveBeenCalledWith("/path?foo=bar", {
        method: "get"
      });
    });
  });

  describe("post", () => {
    it("posts with body", () => {
      Api.post("/path", { foo: "bar" });
      expect(window.fetch).toHaveBeenCalledWith("/path", {
        method: "post",
        body: '{"foo":"bar"}'
      });
    });
  });
});
