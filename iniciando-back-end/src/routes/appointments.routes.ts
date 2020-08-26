import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  //console.log(request.user);
  //importante para saber o ID usuário disponível para ver quem está agendando, listando.

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    // transformação de dados fica em routes
    const parsedDate = parseISO(date);

    // regra de negócio/lógica fica em services
    const createAppointment = new CreateAppointmentService();

    // executa esse service
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    // tem um retorno
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
