import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './posts.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export default class PostsService {
  
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}
 
  getAllPosts() {
    return this.postsRepository.find();
  }
 
  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  async replacePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOneBy({ id });
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }
 
  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}