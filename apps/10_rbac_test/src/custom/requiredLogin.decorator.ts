import { SetMetadata } from '@nestjs/common';

export const RequiredLogin = () => SetMetadata('required-login', true);
