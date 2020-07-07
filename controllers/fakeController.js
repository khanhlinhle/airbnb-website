const faker = require("faker");
const { catchAsync } = require("./errorController");
const Exp = require("../models/experience");
const User = require("../models/user");
const Tag = require("../models/tag");

exports.createFakeExperience = catchAsync(async (request, response, next) => {
    const tagList = [
        "Animals", "Entertainment", "Music", "Cooking", "Baking", "Dance", "Drinks", "Arts & Writing", "Family", "Magic", "Fitness", "Wellness", "History & Culture", "Meditation"
    ];

    const hostList = await User.find({ role: "Host" })
    for (i = 0; i < 150; i++) {
        let hostListIndex = Math.floor(Math.random() * (hostList.length - 1)) + 1;
        const fakeExperience = new Exp({
            title: faker.lorem.sentence(),
            duration: Math.floor(Math.random() * 12) + 1,
            groupSize: Math.floor(Math.random() * 100) + 1,
            images: faker.image.images(),
            price: Math.floor(Math.random() * 1000) + 1,
            country: faker.address.country(),
            city: faker.address.city(),
            description: faker.lorem.paragraphs(),
            items: faker.lorem.sentence(),
            host: hostList[hostListIndex]._id,
            tags: [],
            rating: Math.floor(Math.random() * 5) + 1,
        });
        let randomTagCount = Math.floor(Math.random() * 5) + 1;
        for (let i = 1; i <= randomTagCount; i++) {
            let randomTagsIndex = Math.floor(Math.random() * 14);

            let tagObj = await Tag.findOne({ tag: tagList[randomTagsIndex] });
            if (!tagObj) {
                tagObj = await Tag.create({ tag: tagList[randomTagsIndex] });
            };

            fakeExperience.tags.push(tagObj);
        };
        await fakeExperience.save()
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