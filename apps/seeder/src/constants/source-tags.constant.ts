import { ISourceTag } from '@igikanam/interfaces';
import { users } from './users.constant';

export const sourceTags: ISourceTag[] = [
  {
    tagId: '7d495bb5-0129-4663-a72b-428ae12d38a8',
    name: 'default',
    createdBy: users[2], // admin
  },
  {
    tagId: '6817d784-b4b4-462b-ba37-96ae0bf592af', // gets removed during e2e test 'returns 403 for User role when trying to delete tag of another user'
    name: 'harry potter',
    createdBy: users[2], // admin
  },
  {
    tagId: '2e8a66f2-8554-4377-870d-f7fbf1949e96',
    createdBy: users[0], // user 1
    name: 'space',
  },
  {
    tagId: '6c645a39-93b0-46b5-9125-68e587657ae2', // gets removed during e2e test 'returns 200 for User role when trying to delete their own tag'
    createdBy: users[0], // user 1
    name: 'meme',
  },
  {
    tagId: 'a4276f17-6f3a-48b2-b98c-a60a0bbee347',
    createdBy: users[1], // user 2
    name: 'soomerk',
  },
  {
    tagId: '7183eb11-890d-48e4-820d-f27149ce2072', // gets removed during e2e test 'successfully deletes the tag'
    createdBy: users[2], // user 2
    name: 'shadow power',
  },
];
