import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Course } from './../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('courses')
@UseGuards(AuthenticationGuard)
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Post()
  @UseGuards(AdminGuard)
  async createCourse(@Body() course: Course): Promise<Course> {
    console.log('Creating new course');

    return this.coursesDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Get(':courseUrl')
  async findCourseByUrl(@Param('courseUrl') courseUrl: string) {
    console.log('Finding by courseUrl', courseUrl);

    const course = await this.coursesDB.findCourseByUrl(courseUrl);

    if (!course) {
      throw new NotFoundException('Could not find course for url ' + courseUrl);
    }

    return course;
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Course,
  ): Promise<Course> {
    console.log('Updating course');

    if (changes._id) {
      throw new BadRequestException("Can't update course id");
    }

    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  async deleteCourse(@Param('courseId') courseId: string) {
    console.log('Deleting course');

    return this.coursesDB.deleteCourse(courseId);
  }
}
