import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import { hash } from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const seedUsersData = [
    {
      firstName: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
    },
    {
      firstName: 'Rahim',
      email: 'rahim@example.com',
      password: 'User@123',
    },
    {
      firstName: 'Karim',
      email: 'karim@example.com',
      password: 'User@123',
    },
  ];

  for (const userData of seedUsersData) {
    const exists = await repo.findOne({ where: { email: userData.email } });
    if (exists) continue;

    await repo.save(
      repo.create({
        firstName: userData.firstName,
        email: userData.email,
        password: await hash(userData.password, 10),
      }),
    );
  }
}
