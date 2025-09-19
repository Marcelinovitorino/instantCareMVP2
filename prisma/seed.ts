// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando população do banco de dados...')

  // 1. Criar Serviços (5+ registros)
  console.log('Criando serviços...')
  const services = await prisma.service.createMany({
    data: [
      { name: "Consulta de Clínica Geral", description: "Consulta médica geral", duration: 30 },
      { name: "Consulta de Pediatria", description: "Consulta especializada em crianças", duration: 40 },
      { name: "Consulta de Cardiologia", description: "Avaliação cardíaca especializada", duration: 45 },
      { name: "Consulta de Dermatologia", description: "Avaliação de pele e anexos", duration: 35 },
      { name: "Consulta de Ginecologia", description: "Saúde feminina", duration: 40 },
      { name: "Checkup Completo", description: "Avaliação médica completa", duration: 60 },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${services.count} serviços criados`)

  // 2. Criar Médicos (5+ registros)
  console.log('Criando médicos...')
  const doctors = await prisma.doctor.createMany({
    data: [
      { name: "Dr. João Silva", specialty: "Clínica Geral", license_number: "MG-12345", email: "joao.silva@hospital.com", phone: "+258 84 123 4567" },
      { name: "Dra. Maria Santos", specialty: "Pediatria", license_number: "MG-12346", email: "maria.santos@hospital.com", phone: "+258 84 123 4568" },
      { name: "Dr. Carlos Oliveira", specialty: "Cardiologia", license_number: "MG-12347", email: "carlos.oliveira@hospital.com", phone: "+258 84 123 4569" },
      { name: "Dra. Ana Costa", specialty: "Dermatologia", license_number: "MG-12348", email: "ana.costa@hospital.com", phone: "+258 84 123 4570" },
      { name: "Dra. Sofia Pereira", specialty: "Ginecologia", license_number: "MG-12349", email: "sofia.pereira@hospital.com", phone: "+258 84 123 4571" },
      { name: "Dr. Miguel Fernandes", specialty: "Clínica Geral", license_number: "MG-12350", email: "miguel.fernandes@hospital.com", phone: "+258 84 123 4572" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${doctors.count} médicos criados`)

  // 3. Criar Hospitais (5+ registros)
  console.log('Criando hospitais...')
  const hospitals = await prisma.hospital.createMany({
    data: [
      { name: "Hospital Central de Maputo", address: "Av. Eduardo Mondlane, Maputo", phone: "+258 21 123 456", email: "central@hospital.gov.mz" },
      { name: "Hospital Geral de Matola", address: "Av. 25 de Junho, Matola", phone: "+258 21 234 567", email: "matola@hospital.gov.mz" },
      { name: "Centro de Saúde 1º de Maio", address: "Av. Mao Tse Tung, Maputo", phone: "+258 21 345 678", email: "primeiromaio@saude.gov.mz" },
      { name: "Clínica Sul Africana", address: "Av. Julius Nyerere, Maputo", phone: "+258 21 456 789", email: "info@clinicasa.co.mz" },
      { name: "Hospital Privado", address: "Av. Kenneth Kaunda, Maputo", phone: "+258 21 567 890", email: "contato@hospitalprivado.co.mz" },
      { name: "Centro Médico Beluluane", address: "Estrada Nacional 4, Beluluane", phone: "+258 21 678 901", email: "beluluane@medico.co.mz" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${hospitals.count} hospitais criados`)

  // 4. Criar Usuários (5+ registros)
  console.log('Criando usuários...')
  const hashedPassword = await bcrypt.hash('senha123', 12)
  
  const users = await prisma.user.createMany({
    data: [
      { email: "ana.silva@email.com", password_hash: hashedPassword, name: "Ana Silva", phone: "+258 84 111 1111", birth_date: new Date("1990-05-15"), gender: "female", blood_type: "A+", address: "Av. 25 de Setembro, Maputo", emergency_contact: "+258 82 911 1111" },
      { email: "carlos.santos@email.com", password_hash: hashedPassword, name: "Carlos Santos", phone: "+258 84 222 2222", birth_date: new Date("1985-08-20"), gender: "male", blood_type: "O+", address: "Av. Mao Tse Tung, Maputo", emergency_contact: "+258 82 922 2222" },
      { email: "maria.fernandes@email.com", password_hash: hashedPassword, name: "Maria Fernandes", phone: "+258 84 333 3333", birth_date: new Date("1992-12-10"), gender: "female", blood_type: "B+", address: "Av. Julius Nyerere, Maputo", emergency_contact: "+258 82 933 3333" },
      { email: "joao.oliveira@email.com", password_hash: hashedPassword, name: "João Oliveira", phone: "+258 84 444 4444", birth_date: new Date("1988-03-25"), gender: "male", blood_type: "AB+", address: "Av. Kenneth Kaunda, Maputo", emergency_contact: "+258 82 944 4444" },
      { email: "sofia.costa@email.com", password_hash: hashedPassword, name: "Sofia Costa", phone: "+258 84 555 5555", birth_date: new Date("1995-07-30"), gender: "female", blood_type: "A-", address: "Av. Eduardo Mondlane, Maputo", emergency_contact: "+258 82 955 5555" },
      { email: "miguel.rodrigues@email.com", password_hash: hashedPassword, name: "Miguel Rodrigues", phone: "+258 84 666 6666", birth_date: new Date("1993-11-05"), gender: "male", blood_type: "O-", address: "Av. 25 de Junho, Matola", emergency_contact: "+258 82 966 6666" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${users.count} usuários criados`)

  // 5. Relacionar Médicos com Serviços
  console.log('Relacionando médicos com serviços...')
  const allDoctors = await prisma.doctor.findMany()
  const allServices = await prisma.service.findMany()

  let doctorServiceCount = 0
  for (const doctor of allDoctors) {
    const servicesToAssign = allServices.filter((service: { name: string }) => 
      service.name.toLowerCase().includes(doctor.specialty.toLowerCase()) ||
      service.name === "Checkup Completo"
    ).slice(0, 3)

    for (const service of servicesToAssign) {
      await prisma.doctorService.create({
        data: {
          doctor_id: doctor.id,
          service_id: service.id,
        },
      })
      doctorServiceCount++
    }
  }
  console.log(`✅ ${doctorServiceCount} relações médico-serviço criadas`)

  // 6. Relacionar Hospitais com Serviços
  console.log('Relacionando hospitais com serviços...')
  const allHospitals = await prisma.hospital.findMany()
  
  let hospitalServiceCount = 0
  for (const hospital of allHospitals) {
    for (const service of allServices) {
      await prisma.hospitalService.create({
        data: {
          hospital_id: hospital.id,
          service_id: service.id,
        },
      })
      hospitalServiceCount++
    }
  }
  console.log(`✅ ${hospitalServiceCount} relações hospital-serviço criadas`)

  // 7. Criar Disponibilidade dos Médicos
  console.log('Criando disponibilidade dos médicos...')
  let availabilityCount = 0
  for (const doctor of allDoctors) {
    // Segunda a sexta, 8h-17h
    for (let day = 1; day <= 5; day++) {
      await prisma.doctorAvailability.create({
        data: {
          doctor_id: doctor.id,
          day_of_week: day,
          start_time: "08:00",
          end_time: "17:00",
        },
      })
      availabilityCount++
    }
  }
  console.log(`✅ ${availabilityCount} horários de disponibilidade criados`)

  // 8. Criar Consultas (5+ registros)
  console.log('Criando consultas...')
  const allUsers = await prisma.user.findMany()
  
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-001`,
        scheduled_date: new Date("2024-12-15T10:00:00Z"),
        start_time: "10:00",
        end_time: "11:00",
        status: "scheduled",
        reason: "Checkup anual",
        patient_name: "Ana Silva",
        service_name: "Checkup Completo",
        doctor_name: "Dr. João Silva",
        hospital_name: "Hospital Central de Maputo",
        user_id: allUsers[0].id,
        doctor_id: allDoctors[0].id,
        hospital_id: allHospitals[0].id,
        service_id: allServices[5].id,
      },
    }),
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-002`,
        scheduled_date: new Date("2024-12-16T14:00:00Z"),
        start_time: "14:00",
        end_time: "14:30",
        status: "scheduled",
        reason: "Consulta de rotina",
        patient_name: "Carlos Santos",
        service_name: "Consulta de Clínica Geral",
        doctor_name: "Dr. Miguel Fernandes",
        hospital_name: "Hospital Geral de Matola",
        user_id: allUsers[1].id,
        doctor_id: allDoctors[5].id,
        hospital_id: allHospitals[1].id,
        service_id: allServices[0].id,
      },
    }),
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-003`,
        scheduled_date: new Date("2024-12-17T09:00:00Z"),
        start_time: "09:00",
        end_time: "09:40",
        status: "completed",
        reason: "Acompanhamento pediátrico",
        diagnosis: "Criança saudável",
        notes: "Retorno em 6 meses",
        patient_name: "Maria Fernandes",
        service_name: "Consulta de Pediatria",
        doctor_name: "Dra. Maria Santos",
        hospital_name: "Centro de Saúde 1º de Maio",
        user_id: allUsers[2].id,
        doctor_id: allDoctors[1].id,
        hospital_id: allHospitals[2].id,
        service_id: allServices[1].id,
      },
    }),
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-004`,
        scheduled_date: new Date("2024-12-18T11:00:00Z"),
        start_time: "11:00",
        end_time: "11:45",
        status: "scheduled",
        reason: "Avaliação cardíaca",
        patient_name: "João Oliveira",
        service_name: "Consulta de Cardiologia",
        doctor_name: "Dr. Carlos Oliveira",
        hospital_name: "Clínica Sul Africana",
        user_id: allUsers[3].id,
        doctor_id: allDoctors[2].id,
        hospital_id: allHospitals[3].id,
        service_id: allServices[2].id,
      },
    }),
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-005`,
        scheduled_date: new Date("2024-12-19T15:00:00Z"),
        start_time: "15:00",
        end_time: "15:35",
        status: "cancelled",
        reason: "Consulta dermatológica",
        patient_name: "Sofia Costa",
        service_name: "Consulta de Dermatologia",
        doctor_name: "Dra. Ana Costa",
        hospital_name: "Hospital Privado",
        user_id: allUsers[4].id,
        doctor_id: allDoctors[3].id,
        hospital_id: allHospitals[4].id,
        service_id: allServices[3].id,
      },
    }),
    prisma.appointment.create({
      data: {
        consultation_code: `CONS-${Date.now()}-006`,
        scheduled_date: new Date("2024-12-20T08:00:00Z"),
        start_time: "08:00",
        end_time: "08:40",
        status: "scheduled",
        reason: "Consulta ginecológica",
        patient_name: "Miguel Rodrigues",
        service_name: "Consulta de Ginecologia",
        doctor_name: "Dra. Sofia Pereira",
        hospital_name: "Centro Médico Beluluane",
        user_id: allUsers[5].id,
        doctor_id: allDoctors[4].id,
        hospital_id: allHospitals[5].id,
        service_id: allServices[4].id,
      },
    }),
  ])
  console.log(`✅ ${appointments.length} consultas criadas`)

  // 9. Criar Prescrições (5+ registros)
  console.log('Criando prescrições...')
  const prescriptions = await Promise.all([
    prisma.prescription.create({
      data: {
        uuid: require('crypto').randomUUID(),
        issue_date: new Date("2024-12-17T09:40:00Z"),
        expiration_date: new Date("2025-01-17T09:40:00Z"),
        instructions: "Tomar 1 comprimido por dia durante 30 dias",
        user_id: allUsers[2].id,
        doctor_id: allDoctors[1].id,
        appointment_id: appointments[2].id,
        medications: {
          create: [
            {
              medication_name: "Paracetamol",
              dosage: "500mg",
              frequency: "1x ao dia",
              duration: "30 dias",
              instructions: "Tomar após o almoço"
            }
          ]
        }
      },
    }),
    prisma.prescription.create({
      data: {
        uuid: require('crypto').randomUUID(),
        issue_date: new Date("2024-11-10T10:00:00Z"),
        expiration_date: new Date("2024-12-10T10:00:00Z"),
        instructions: "Aplicar 2x ao dia",
        user_id: allUsers[0].id,
        doctor_id: allDoctors[3].id,
        medications: {
          create: [
            {
              medication_name: "Pomada Hidratante",
              dosage: "50g",
              frequency: "2x ao dia",
              duration: "30 dias",
              instructions: "Aplicar na área afetada"
            }
          ]
        }
      },
    }),
    // Adicionar mais prescrições...
  ])
  console.log(`✅ ${prescriptions.length} prescrições criadas`)

  // 10. Criar Exames Médicos (5+ registros)
  console.log('Criando exames médicos...')
  const medicalExams = await Promise.all([
    prisma.medicalExam.create({
      data: {
        uuid: require('crypto').randomUUID(),
        exam_type: "Hemograma Completo",
        exam_date: new Date("2024-12-10T08:00:00Z"),
        results: "Dentro dos parâmetros normais",
        lab_name: "Laboratório Central",
        doctor_notes: "Resultados satisfatórios",
        user_id: allUsers[0].id,
      },
    }),
    prisma.medicalExam.create({
      data: {
        uuid: require('crypto').randomUUID(),
        exam_type: "Eletrocardiograma",
        exam_date: new Date("2024-12-18T11:45:00Z"),
        results: "Ritmo sinusal normal",
        lab_name: "CardioLab",
        doctor_notes: "Função cardíaca normal",
        user_id: allUsers[3].id,
        appointment_id: appointments[3].id,
      },
    }),
    // Adicionar mais exames...
  ])
  console.log(`✅ ${medicalExams.length} exames médicos criados`)

  // 11. Criar Configurações de Usuário
  console.log('Criando configurações de usuário...')
  for (const user of allUsers) {
    await prisma.userSettings.create({
      data: {
        user_id: user.id,
      },
    })
  }
  console.log(`✅ ${allUsers.length} configurações de usuário criadas`)

  // 12. Criar Métricas de Saúde (5+ registros)
  console.log('Criando métricas de saúde...')
  const healthMetrics = await Promise.all([
    prisma.healthMetric.create({
      data: {
        metric_type: "Pressão Arterial",
        value: "120/80",
        unit: "mmHg",
        measured_at: new Date("2024-12-15T08:00:00Z"),
        notes: "Medição matinal",
        user_id: allUsers[0].id,
      },
    }),
    prisma.healthMetric.create({
      data: {
        metric_type: "Glicemia",
        value: "95",
        unit: "mg/dL",
        measured_at: new Date("2024-12-15T08:30:00Z"),
        notes: "Em jejum",
        user_id: allUsers[0].id,
      },
    }),
    // Adicionar mais métricas...
  ])
  console.log(`✅ ${healthMetrics.length} métricas de saúde criadas`)

  // 13. Criar Lembretes (5+ registros)
  console.log('Criando lembretes...')
  const reminders = await Promise.all([
    prisma.reminder.create({
      data: {
        type: "appointment",
        title: "Consulta com Dr. João Silva",
        message: "Sua consulta está agendada para 15/12/2024 às 10:00",
        scheduled_time: new Date("2024-12-14T10:00:00Z"),
        user_id: allUsers[0].id,
      },
    }),
    prisma.reminder.create({
      data: {
        type: "medication",
        title: "Tomar Paracetamol",
        message: "Lembrete para tomar seu medicamento",
        scheduled_time: new Date("2024-12-15T12:00:00Z"),
        user_id: allUsers[2].id,
      },
    }),
    // Adicionar mais lembretes...
  ])
  console.log(`✅ ${reminders.length} lembretes criados`)

  // 14. Criar Logs de Acesso (5+ registros)
  console.log('Criando logs de acesso...')
  const accessLogs = await Promise.all([
    prisma.accessLog.create({
      data: {
        action: "login",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        user_id: allUsers[0].id,
      },
    }),
    prisma.accessLog.create({
      data: {
        action: "view_appointments",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        user_id: allUsers[1].id,
      },
    }),
    // Adicionar mais logs...
  ])
  console.log(`✅ ${accessLogs.length} logs de acesso criados`)

  console.log('🎉 População do banco de dados concluída com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a população:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })