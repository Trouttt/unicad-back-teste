import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dataSource } from 'ormconfig-migrations';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportEntity } from './entities/report.entity';
const PDFDocument = require('pdfkit-table');
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) { }
  async getReport() {
    const query = await this.reportRepository.manager.query(
      `SELECT Posts.title, COUNT(Comments.id) FROM Posts LEFT JOIN Comments ON Comments.Post = Posts.id WHERE Comments.deleted_at IS NULL GROUP BY Posts.title`,
    );

    const table = {
      title: 'Relatório das postagens',
      headers: [
        { label: 'titulo', property: 'title' },
        { label: 'quantidade de comentários', property: 'count' },
      ],
      datas: query,
    };
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });

      await doc.table(table, {});

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
