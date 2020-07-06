const faker = require("faker");
const { catchAsync } = require("./errorController");
const Exp = require("../models/experience");
const User = require("../models/user");

exports.getFakeUsers = catchAsync(async (request, response) => {
    const fakeUsers = new User.find({}).limit(20);
    response.status(200).json({
        status: "Success",
        data: fakeUsers
    });
});

exports.createFakeExperience = catchAsync(async (request, response, next) => {
    const hostList = await User.find({ role: "Host" })
    // let hostListIndex = Math.floor(Math.random() * hostList.length) == 0 ? 0 : Math.floor(Math.random() * hostList.length) - 1
    for (i = 0; i < 10; i++) {
        let hostListIndex = Math.floor(Math.random() * (hostList.length - 1)) + 1;
        const fakeExperience = await Exp.create({
            title: faker.lorem.sentence(),
            duration: Math.floor(Math.random() * 12) + 1,
            groupSize: faker.random.number(),
            images: faker.image.image(),
            price: Math.floor(Math.random() * 1000) + 1,
            country: faker.address.country(),
            city: faker.address.city(),
            description: faker.lorem.paragraphs(),
            items: faker.lorem.sentence(),
            host: hostList[hostListIndex]._id
        });
    };
    response.send("OK");
}
);

exports.createFakeUser = catchAsync(async (request, response, next) => {
    let role = ["Normal", "Host"];
    for (i = 0; i < 100; i++) {
        const fakeUser = await User.create({
            email: faker.internet.email(),
            password: faker.random.word(),
            name: faker.name.firstName() + " " + faker.name.lastName(),
            role: role[Math.floor(Math.random() * 1)],
        });
        if (fakeUser.role === "Host") {
            fakeUser.introduction = faker.lorem.paragraphs();
            await fakeUser.save();
        };
    };
    response.send("OK");
});