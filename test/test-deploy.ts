import { ethers } from "hardhat"
import { assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

interface IPerson {
  name: string
  favoriteNumber: bigint
}

describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage

  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as unknown as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number equal 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should have favorite number update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString().to.equal(expectedValue)) //this line and the one above do the same thing
  })

  it("Should be able to add a person", async function () {
    const expectedPerson: IPerson = {
      name: "John Smith",
      favoriteNumber: 7n,
    }
    await simpleStorage.addPerson(
      expectedPerson.name,
      expectedPerson.favoriteNumber
    )
    const people = await simpleStorage.people(0)

    assert.equal(expectedPerson.name, people.name)
    assert.equal(expectedPerson.favoriteNumber, people.favoriteNumber)
  })
})
