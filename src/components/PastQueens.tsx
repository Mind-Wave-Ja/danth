'use client';
import Image from 'next/image';
import { pastQueens } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Crown } from 'lucide-react';

const PastQueens = () => {
    
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {pastQueens.map((queen) => (
                    <CarouselItem key={queen.id} className="md:basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="bg-card/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full">
                                <CardHeader className="p-0">
                                    <Image
                                        src={queen.avatar}
                                        alt={queen.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                        data-ai-hint="past dancehall artist female"
                                        crossOrigin="anonymous"
                                    />
                                </CardHeader>
                                <CardContent className="p-6 text-center flex flex-col flex-grow">
                                    <CardTitle className="text-2xl font-bold uppercase text-accent flex items-center justify-center gap-2">
                                       <Crown className="w-6 h-6" /> {queen.name}
                                    </CardTitle>
                                    <CardDescription className="mt-4 text-foreground flex-grow">
                                        A reigning queen of the dancehall scene.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default PastQueens;
