// import app from "../../examples/project/src/App.vue";
// import vanime from "../../src/index";
describe("normal animation(基础动画)", () => {
  // cy.mount(app, { plugin: vanime });
  beforeEach(() => {
    cy.visit("/");
  });
  it("timeline(action controlling multiple dom)", () => {
    cy.clock();
    cy.get("[btn1]").click();
    cy.tick(1100);
    cy.get("[block1]").should("have.css", "opacity", "0.5");
    cy.get("[block2]").should("have.css", "opacity", "0.5");
  });
  it("reverse timeline", () => {
    cy.clock();
    cy.get("[btn2]").click();
    cy.tick(1100);
    cy.get("[block1]").should("have.css", "opacity", "1");
    cy.get("[block2]").should("have.css", "opacity", "1");
  });
  it("(v-if) firt time enter(symmetry)", () => {
    cy.clock();
    cy.get("[btn3]").click();
    cy.tick(2100);
    cy.get("[anime=block3]").should("have.css", "opacity", "1");
  });
  it("(v-if) firt time leave(symmetry)", () => {
    cy.clock();
    cy.get("[btn4]").click();
    cy.tick(1000);
    cy.get("[anime=block4]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.5, 0.05);
    });
    cy.tick(1100);
    cy.get("[anime=block4]").should("not.exist");
  });
  it("(v-if) firt time leave", () => {
    cy.clock();
    cy.get("[btn5]").click();
    cy.tick(1000);
    cy.get("[anime=block5]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.5, 0.05);
    });
    cy.tick(1100);
    cy.get("[anime=block5]").should("not.exist");
  });
  it("(v-if) firt time leave", () => {
    cy.clock();
    cy.get("[btn6]").click();
    cy.tick(2100);
    cy.get("[anime=block6]").should("have.css", "opacity", "1");
  });
  it("(v-show) firt time enter", () => {
    cy.clock();
    cy.get("[btn9]").click();
    cy.tick(2100);
    cy.get("[anime=block9]").should("have.css", "opacity", "1");
  });
  it("(v-show) firt time leave", () => {
    cy.clock();
    cy.get("[btn10]").click();
    cy.tick(2100);
    cy.get("[anime=block10]").should("have.css", "opacity", "0");
  });
});

describe("break animation(中断动画)", () => {
  // cy.mount(app, { plugin: vanime });
  beforeEach(() => {
    cy.visit("/");
  });

  it("(v-if) firt time enter(symmetry)", () => {
    cy.clock();
    cy.get("[btn3]").click();
    cy.tick(1000);
    cy.get("[btn3]").click();
    cy.tick(500);
    cy.get("[anime=block3]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.25, 0.05);
    });
  });
  it("(v-if) firt time leave(symmetry)", () => {
    cy.clock();
    cy.get("[btn4]").click();
    cy.tick(1000);
    cy.get("[btn4]").click();
    cy.tick(500);
    cy.get("[anime=block4]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.75, 0.05);
    });
  });
  it("(v-if) firt time leave", () => {
    cy.clock();
    cy.get("[btn5]").click();
    cy.tick(1000);
    cy.get("[btn5]").click();
    cy.tick(500);
    cy.get("[anime=block5]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.63, 0.05);
    });
  });
  it("(v-if) firt time enter", () => {
    cy.clock();
    cy.get("[btn6]").click();
    cy.tick(1000);
    cy.get("[anime=block6]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.5, 0.05);
    });
    cy.get("[btn6]").click();
    cy.tick(500);
    cy.get("[anime=block6]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.37, 0.05);
    });
  });
  it("(v-show) firt time enter", () => {
    cy.clock();
    cy.get("[btn9]").click();
    cy.tick(1000);
    cy.get("[btn9]").click();
    cy.tick(500);
    cy.get("[anime=block9]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.25, 0.05);
    });
  });
  it("(v-show) firt time leave", () => {
    cy.clock();
    cy.get("[btn10]").click();
    cy.tick(1000);
    cy.get("[btn10]").click();
    cy.tick(500);
    cy.get("[anime=block10]").should(($div) => {
      expect(Number($div.css("opacity"))).to.be.closeTo(0.75, 0.05);
    });
  });
});
