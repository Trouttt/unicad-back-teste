import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AwsS3Service {
  private readonly bucketName: string;
  private readonly s3: S3;
  private readonly publicDirectoryName: string = 'public';

  constructor(
    private readonly configService: ConfigService<
      {
        AWS_S3_BUCKET_NAME: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
      },
      true
    >,
  ) {
    this.bucketName = configService.get<string>('AWS_S3_BUCKET_NAME', {
      infer: true,
    });
    this.s3 = new S3({
      signatureVersion: 'v4',
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', {
        infer: true,
      }),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', {
        infer: true,
      }),
      region: configService.get<string>('AWS_REGION', {
        infer: true,
      }),
    });
  }

  async createMediaS3(folder_name: string): Promise<any> {
    const timestamp = Date.now();
    const key = `${this.publicDirectoryName}/${folder_name}/${timestamp}.png`;
    const s3Params = {
      Bucket: this.bucketName,
      Key: key,
    };
    let s3Response;
    try {
      const uploadUrl = this.s3.getSignedUrl('putObject', s3Params);
      s3Response = {
        uploadUrl,
        key,
      };
    } catch (error) {
      error.customDescription =
        'This error is related to AWS S3 image upload in quikdev-back';
      throw new BadRequestException(error);
    }
    return s3Response;
  }
}
