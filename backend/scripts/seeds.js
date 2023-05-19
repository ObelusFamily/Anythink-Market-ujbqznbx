//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require("mongoose");
const connection = process.env.MONGODB_URI
mongoose.connect(connection)

const User = mongoose.model("User")
const Item = mongoose.model("Item")
const Comment = mongoose.model("Comment")

const seedDatabase = async () => {
    for (let i = 0; i < 100; i++){
        const user = {username: `user${i}`, email: `user${i}@gmail.com`}
        const option = { upsert: true, new: true}
        const createUser = await User.findOneAndUpdate(user, {}, option)
        
        const item = {
            slug: `slug${i}`,
            title: `title ${i}`,
            description: `description ${i}`,
            seller: `seller ${i}`,
        } 
        const createItem = await Item.findOneAndUpdate(item, {}, option)

        if (!createdItem?.comments?.length){
            let commmentIds = []
            for (let j = 0; j < 100; j++){
                const comment = new Comment({
                    body: `body ${j}`,
                    seller: createdUser,
                    item: createdItem,
                })
                await comment.save();
                commentIds.push(comment._id);
            }
            createdItem.comments = commmentIds;
            await createdItem.save()
        }
    }
}

seedDatabase()
  .then(() => {
  console.log("Finished DB seeding");
  process.exit(0);
})
.catch((err) => {
  console.log(`Error while running DB seed: ${err.message}`);
  process.exit(1);
});