import { IUser, Role } from '@igikanam/interfaces';

// password: abcDEF123
export const users: IUser[] = [
  {
    userId: '17631e48-c5de-432f-826e-a1461a2928ed',
    email: 'user@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.user,
  },
  {
    userId: '5b5829b4-efd2-4c44-8c2b-648e54768fd7',
    email: 'user2@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.user,
  },
  {
    userId: 'e1aee996-3d70-48ad-8d5f-fd99e2d2610c',
    email: 'admin@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.admin,
  },
];
