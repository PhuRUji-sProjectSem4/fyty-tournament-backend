import { BadRequestException, Injectable } from '@nestjs/common';
import { Tournament, TourStatus } from '@prisma/client';
import { AddTournamentDto, UpdateTournamentDto } from 'src/dto/tournament.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TournamentService {
    constructor(private readonly prisma: PrismaService){}

    async createTour(payload: AddTournamentDto): Promise<Tournament>{
        try{
            return await this.prisma.tournament.create({
                data: payload
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getAllTour():Promise<Tournament[]>{
        try{
            return await this.prisma.tournament.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTourById(tourId: Tournament["id"]):Promise<Tournament>{
        try{
            return await this.prisma.tournament.findUniqueOrThrow({
                where:{
                    id: tourId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async updateTour(tourId: Tournament["id"], payload: UpdateTournamentDto):Promise<Tournament>{
        try{
            return await this.prisma.tournament.update({
                where:{
                    id: tourId
                },
                data: payload
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async deleteTour(tourId: Tournament["id"]):Promise<Tournament>{
        try{
            const tour = await this.prisma.tournament.findUniqueOrThrow({
                where:{
                    id: tourId
                }
            })

            if(tour.status == TourStatus.CHECKING){
                return await this.prisma.tournament.delete({
                    where:{
                        id: tourId
                    }
                });
            }
            else{
                throw new BadRequestException("Can not change a detail after start Register.")
            }
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async registerTour(tourId: Tournament["id"]): Promise<Tournament>{
        try{
            return await this.prisma.tournament.update({
                where:{
                    id: tourId
                },
                data:{
                    status: TourStatus.REGISTER
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async startTour(tourId: Tournament["id"]): Promise<Tournament>{
        try{
            return await this.prisma.tournament.update({
                where:{
                    id: tourId
                },
                data:{
                    status: TourStatus.STARTED
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async endTour(tourId: Tournament["id"]): Promise<Tournament>{
        try{
            return await this.prisma.tournament.update({
                where:{
                    id: tourId
                },
                data:{
                    status: TourStatus.ENDED
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

}
