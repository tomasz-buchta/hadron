import { expect } from "chai";
import container from "../container";
import containerItem from "../containerItem";
import { Lifetime } from "../lifetime";

describe("container register", () => {
    it("should overrive value for the the same key", () => {
        const itemName = "test";
        container.register(itemName, "given");
        container.register(itemName, "given2");
        expect("given2").to.equal(container.take(itemName));
    });
    it("should always return the same object - Singletone", () => {
        const itemName = "test";
        // tslint:disable-next-line:max-classes-per-file
        class Foo {
            public value: string;
            constructor() {
                this.value = (new Date()).getTime().toString();
            }
        }
        container.register(itemName, Foo, Lifetime.Singletone);
        const item1 = container.take(itemName);
        const item2 = container.take(itemName);
        expect(item2).to.deep.equal(item1);
    });
    it("should always return a new same object - Transient", () => {
        // tslint:disable-next-line:max-classes-per-file
        class Foo {
            public value: string;
            constructor() {
                this.value = "xxxx";
            }
        }
        container.register("test", Foo, Lifetime.Transient);
        const item1 = container.take("test");
        const item2 = container.take("test");
        expect(item1).to.deep.equal(item2);
    });
  });
describe("container items with parameters in constructor", () => {
    it("second level of injection", () => {
        // tslint:disable-next-line:max-classes-per-file
        class Foo {
            public value: number;
            constructor() {
                this.value = 4;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class Foo2 {
            public value: number;
            constructor(parameterName: Foo) {
                this.value = parameterName.value;
            }
        }
        container.register("parameterName", Foo, Lifetime.Transient);
        container.register("foo2", Foo2, Lifetime.Transient);

        const item = container.take("parameterName") as Foo;

        expect(4).to.be.equal(item.value);
        });
    });
