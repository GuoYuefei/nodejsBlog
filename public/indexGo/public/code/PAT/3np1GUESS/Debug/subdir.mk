################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../A3NP1.cpp 

OBJS += \
./A3NP1.o 

CPP_DEPS += \
./A3NP1.d 


# Each subdirectory must supply rules for building sources it contributes
A3NP1.o: ../A3NP1.cpp
	@echo 'Building file: $<'
	@echo 'Invoking: GCC C++ Compiler'
	g++ -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"A3NP1.d" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


