// npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
// npx dotenv sequelize db:migrate
// npx sequelize seed:generate --name demo-user
// npx dotenv sequelize db:seed:all
// npx sequelize migration:generate --name add-firstName-to-User
// npx sequelize migration:generate --name add-lastName-to-User

// npx sequelize model:generate --name Lego --attributes userId:integer,name:string,itemNumber:integer,pieces:integer,ages:string,theme:string,status:string,image:string
// npx sequelize model:generate --name Tag --attributes name:string
// npx sequelize model:generate --name LegoTag --attributes legoId:integer,tagId:integer
// npx sequelize model:generate --name Message --attributes senderId:integer,recipientId:integer,message:string
// npx sequelize model:generate --name MessageStatus --attributes messageId:integer,userId:integer,isRead:boolean
// npx sequelize model:generate --name Wishlist --attributes userId:integer,legoId:integer
// npx sequelize model:generate --name Follow --attributes followingUserId:integer,followedUserId:integer

// npx sequelize migration:generate --name add-legoId-to-Tag
// npx sequelize migration:generate --name add-userId-to-Tag



// npx sequelize seed:generate --name lego-seeders
// npx sequelize seed:generate --name tag-seeders
// npx sequelize seed:generate --name legoTag-seeders
// npx sequelize seed:generate --name message-seeders
// npx sequelize seed:generate --name messageStatus-seeders
// npx sequelize seed:generate --name wishlist-seeders
// npx sequelize seed:generate --name follow-seeders
