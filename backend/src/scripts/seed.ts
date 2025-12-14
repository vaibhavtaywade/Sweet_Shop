import User from "../models/User.model"
import Sweet from "../models/Sweet.model"
import { connectDB } from "../config/database"
import dotenv from "dotenv"

dotenv.config()

const seedDatabase = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Sweet.deleteMany({})

    // Create admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@sweetshop.com",
      password: "admin123", // Will be hashed by pre-save hook
      role: "admin",
    })
    await adminUser.save()

    // Create regular user
    const regularUser = new User({
      username: "user",
      email: "user@sweetshop.com",
      password: "user123", // Will be hashed by pre-save hook
      role: "user",
    })
    await regularUser.save()

    // Create sample sweets
    const sweets = [
      {
        name: "Chocolate Truffle",
        description: "Rich dark chocolate truffles with cocoa powder coating",
        price: 2.5,
        category: "chocolate",
        stock: 100,
        imageUrl: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400",
      },
      {
        name: "Strawberry Gummy Bears",
        description: "Chewy and fruity strawberry-flavored gummy bears",
        price: 1.5,
        category: "gummy",
        stock: 150,
        imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
      },
      {
        name: "Caramel Fudge",
        description: "Smooth and creamy caramel fudge",
        price: 3.0,
        category: "candy",
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400",
      },
      {
        name: "Mint Chocolate Chip",
        description: "Refreshing mint chocolate with chocolate chips",
        price: 2.75,
        category: "chocolate",
        stock: 90,
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
      },
      {
        name: "Sour Worms",
        description: "Tangy and sour gummy worms in assorted flavors",
        price: 1.75,
        category: "gummy",
        stock: 120,
        imageUrl: "https://images.unsplash.com/photo-1629894670950-8f9d4b9c8f4c?w=400",
      },
      {
        name: "Peanut Butter Cups",
        description: "Creamy peanut butter covered in milk chocolate",
        price: 2.25,
        category: "chocolate",
        stock: 110,
        imageUrl: "https://images.unsplash.com/photo-1571506165871-ee72a35f52ae?w=400",
      },
      {
        name: "Rainbow Lollipop",
        description: "Colorful swirled lollipop on a stick",
        price: 1.0,
        category: "candy",
        stock: 200,
        imageUrl: "https://images.unsplash.com/photo-1556912173-92916ff96b22?w=400",
      },
      {
        name: "Vanilla Marshmallows",
        description: "Soft and fluffy vanilla marshmallows",
        price: 1.25,
        category: "candy",
        stock: 130,
        imageUrl: "https://images.unsplash.com/photo-1534123408879-a0b7e5f69c46?w=400",
      },
    ]

    await Sweet.insertMany(sweets)

    console.log("✅ Database seeded successfully!")
    console.log("\n📋 Default Credentials:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━")
    console.log("👤 Admin User:")
    console.log("   Email: admin@sweetshop.com")
    console.log("   Password: admin123")
    console.log("\n👤 Regular User:")
    console.log("   Email: user@sweetshop.com")
    console.log("   Password: user123")
    console.log("━━━━━━━━━━━━━━━━━━━━━━\n")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
