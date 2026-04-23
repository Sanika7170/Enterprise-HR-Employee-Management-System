require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Department = require('./models/Department');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/enterprise_hr_final');
    console.log('Connected to MongoDB for seeding...');

    await Employee.deleteMany({});
    await Department.deleteMany({});

    const depts = await Department.insertMany([
      { name: 'Engineering' },
      { name: 'Human Resources' },
      { name: 'Marketing' },
      { name: 'Sales' }
    ]);

    await Employee.insertMany([
      { name: 'John Doe', email: 'john@example.com', department: 'Engineering', designation: 'Senior Developer', status: 'Active' },
      { name: 'Jane Smith', email: 'jane@example.com', department: 'Human Resources', designation: 'HR Manager', status: 'Active' },
      { name: 'Mike Ross', email: 'mike@example.com', department: 'Legal', designation: 'Junior Associate', status: 'Active' },
      { name: 'Harvey Specter', email: 'harvey@example.com', department: 'Legal', designation: 'Senior Partner', status: 'Active' }
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
