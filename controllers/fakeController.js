const faker = require("faker");
const { catchAsync } = require("./errorController");
const Exp = require("../models/experience");
const User = require("../models/user");
const PAGE_SIZE = 25;

exports.getFakeExperiences = catchAsync(async (request, response) => {
    const pageNum = request.query.page || 1;
    const numToSkip = (parseInt(pageNum) - 1) * PAGE_SIZE;
    const fakeExperiences = new Exp.find({}).limit(PAGE_SIZE).skip(numToSkip);
    response.status(200).json({
        status: "Success",
        data: fakeExperiences
    });
});

exports.getFakeUsers = catchAsync(async (request, response) => {
    const fakeUsers = new User.find({}).limit(20);
    response.status(200).json({
        status: "Success",
        data: fakeUsers
    });
});

exports.createFakeExperience = catchAsync(async (request, response, next) => {
    const hostList = await User.find({ role: "Host" })
    for (i = 0; i < 10; i++) {
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
            host: hostList[Math.floor(Math.random() * hostList.length) + 1]._id
        });
    };
    response.send("OK");
}
);

exports.createFakeUser = catchAsync(async (request, response, next) => {
    let role = ["Normal", "Host"];
    for (i = 0; i < 10; i++) {
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