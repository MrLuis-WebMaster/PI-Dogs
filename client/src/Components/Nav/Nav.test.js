import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Nav from "./Nav"
configure({ adapter: new Adapter() });
describe("<Nav />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<Nav />);
  });
  it('Debería renderizar dos <Link to="" />.', () => {
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
  });
  it('Debería tener un Link con el texto "home" que cambie la ruta hacia "/home"', () => {
    expect(nav.find(Link).at(0).prop("to")).toEqual("/home");
  });
  it('Debería tener un Link, con texto "/home/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/home/create");
  });
});