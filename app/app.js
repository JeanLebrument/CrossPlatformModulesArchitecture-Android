import './theme';
import { router, route } from 'reapp-kit';

router(require,
  route('SearchPage', '/',
    route('SearchResults', '/',
      route('PropertyView', '/')
    )
  )
);
