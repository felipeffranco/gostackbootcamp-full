import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns (Separação de preocupações)
// DTO: Data Transfer Objetc
// ROTA: Receber a requisição, chamar outro arquivo e devolver uma resposta

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    // transformação de dados fica em routes
    const parsedDate = parseISO(date);

    // regra de negócio/lógica fica em services
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    // executa esse service
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    // tem um retorno
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
