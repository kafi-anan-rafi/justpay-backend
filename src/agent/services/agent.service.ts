import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupAgentDto } from '../dto/signup-agent.dto';
import { AgentEntity } from '../entities/agent.entity';
import { UpdateAgentDto } from '../dto/update-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private agentRepository: Repository<AgentEntity>,
    private mailerService: MailerService
  ) { }

  viewProfile(id: number) {
    const agnt = this.agentRepository.findOneBy({ id })
    if (!agnt) {
      throw new NotFoundException(`Agent of id ${id} doesn't exist!`)
    }
    return agnt;
  }

  updateProfile(id: number, updateAgentDto: UpdateAgentDto) {
    return this.agentRepository.update(id, updateAgentDto)
  }

  async signin(mydto) {
    const mydata = await this.agentRepository.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return { status: true, agentId: mydata.id };
    }
    else {
      return { status: false };
    }
  }

  async signup(info) {
    const salt = await bcrypt.genSalt();
    const hassed = await bcrypt.hash(info.password, salt);
    info.password = hassed;
    return this.agentRepository.save(info);
  }

  // async sendEmail(mydata) {
  //   return await this.mailerService.sendMail({
  //     to: mydata.email,
  //     subject: mydata.subject,
  //     text: mydata.text,
  //   });
  // }

}