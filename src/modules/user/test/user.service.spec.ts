import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';
import { Model, ObjectionModule } from 'nestjs-objection/dist';

const mockUsers = [
  {
    id: '1',
    email: 'user1@email.com',
    password: 'password', // No need the encrypted pwd here
    salt: 'salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  },
  {
    id: '2',
    email: 'user2@email.com',
    password: 'password', // No need the encrypted pwd here
    salt: 'salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  }
];

describe('UserService', () => {
  let userService: UserService;
  let mockDb = {
    init(email: string) {
      jest.spyOn(UserModel, 'query').mockImplementation(() => {
        const user = mockUsers.filter(user => user.email === email);
        return user ? Model.query().resolve(user) : undefined;
      });
    },
    destroy() {
      jest.clearAllMocks();
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ObjectionModule.forFeature([UserModel])
      ],
      providers: [
        UserService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    mockDb.destroy();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return the user entity', async () => {
    mockDb.init('user1@email.com');
    const user = await userService.findOne('user1@email.com');
    expect(user).toBeDefined();
  });
  
  it('should not return the user entity', async () => {
    mockDb.init('user4@email.com');
    const user = await userService.findOne('user4@email.com');
    expect(user).not.toBeDefined();
  });
});