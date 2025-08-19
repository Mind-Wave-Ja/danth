'use client';
import Image from 'next/image';
import { pastKings } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Crown } from 'lucide-react';

const PastKings = () => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {pastKings.map((king) => (
                    <CarouselItem key={king.id} className="md:basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="bg-card/50 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full">
                                <CardHeader className="p-0">
                                    <Image
                                        src={king.avatar}
                                        alt={king.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                        data-ai-hint="past dancehall artist"
                                        crossOrigin="anonymous"
                                    />
                                </CardHeader>
                                <CardContent className="p-6 text-center flex flex-col flex-grow">
                                    <CardTitle className="text-2xl font-bold uppercase text-accent flex items-center justify-center gap-2">
                                       <Crown className="w-6 h-6" /> {king.name}
                                    </CardTitle>
                                    <p className="text-lg font-semibold text-muted-foreground mt-1">{king.era}</p>
                                    <CardDescription className="mt-4 text-foreground flex-grow">
                                        {king.description}
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

export default PastKings;
