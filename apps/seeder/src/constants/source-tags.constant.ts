import { ISourceTag } from '@igikanam/interfaces';
import { users } from './users.constant';

export const sourceTags: ISourceTag[] = [
  {
    tagId: 'e025993c-10d4-4114-93d3-44049e4d9c98',
    name: 'default',
    createdBy: users[2], // admin
  },
  {
    tagId: 'c44426f2-5582-4da7-bc3c-611a88957799',
    createdBy: users[0], // user 1
    name: 'space',
  },
  {
    tagId: '6c645a39-93b0-46b5-9125-68e587657ae2',
    createdBy: users[0], // user 1
    name: 'meme',
  },
  {
    tagId: '5fb39f9f-3bf9-4a68-a056-c2e54465b590',
    createdBy: users[1], // user 2
    name: 'soomerk',
  },
  {
    tagId: '4e897fe7-734e-4cab-95fb-46cd6647f9c8',
    createdBy: users[2], // user 2
    name: 'shadow power',
  },
];
