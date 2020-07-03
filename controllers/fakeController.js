const { catchAsync } = require("./errorController");
const faker = require("faker");
const Exp = require("../models/experience");

exports.createFakeExperience = catchAsync(async (request, response) => {
    let duration = Math.floor(Math.random() * 12) + 1;
    let rating = Math.floor(Math.random() * 5) + 1;
    const fakeExperience = await Exp.create({
        images: faker.image.image(),
        country: faker.address.country(),
        title: faker.lorem.sentence(),
        price: faker.commerce.price(),
        duration: duration,
        rating: rating,
        peopleRated: faker.random.number(),
        description: faker.lorem.paragraphs(),
    });
    response.status(200).json({
        status: "Success",
        data: fakeExperience
    });
});