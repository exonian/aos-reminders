import React, { useEffect } from 'react'
import { useAuth0 } from 'react-auth0-wrapper'
import { useSubscription } from 'context/useSubscription'
import { logPageView } from 'utils/analytics'
import { NavBar } from 'components/page/navbar'
import { PricingPlans } from 'components/payment/pricingPlans'
import { IUser } from 'types/user'
import { Loading } from 'components/page/loading'

export const Subscribe: React.FC<{}> = () => {
  const { loading, user }: { loading: boolean; user: IUser } = useAuth0()
  const { isSubscribed, getSubscription } = useSubscription()

  useEffect(() => {
    logPageView()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getSubscription()
  }, [getSubscription])

  if (loading || !user) return <Loading />
  // TODO Flesh this out to look nicer
  if (isSubscribed) return <AlreadySubscribed />

  const headerClass = `col-12 col-lg-8 col-xl-8 py-5 mx-auto`

  return (
    <div className="d-block">
      <div className="ThemeDarkBg py-2">
        <NavBar />
      </div>

      <div className={headerClass}>
        <img
          className="d-block mx-auto mb-4 img-fluid"
          src="/img/logo_noURL.png"
          width="100px"
          alt="Subscribe to support AoS Reminders"
        />
        <h2>Support AoS Reminders</h2>
        <p className="lead">
          It takes a lot of time, effort, and money to keep this project going. While the core product will{' '}
          <i>always</i> be free, I do offer this subscription service to those who wish to support AoS
          Reminders.
        </p>
        <p className="lead">What do you get from subscribing to AoS Reminders?</p>
        <ul className="lead">
          <li>
            Accessing your saved armies from <strong>anywhere</strong> on <strong>any device.</strong>
          </li>
        </ul>
        <ul className="lead">
          <li>
            <em>Importing army lists from Warscroll Builder</em>
          </li>
          <li>
            <em>Importing army lists from Battlescribe</em>
          </li>
          <li>
            <em>Adding custom reminders</em>
          </li>
          <li>
            <strong>
              <em>and much more!</em>
            </strong>
            {' - Check out our upcoming features '}
            <a
              href="https://github.com/daviseford/aos-reminders/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              on Github!
            </a>
          </li>
        </ul>
      </div>

      <div>
        <PricingPlans />
      </div>
    </div>
  )
}

const AlreadySubscribed = () => {
  return (
    <div className="d-block">
      <div className="ThemeDarkBg py-2">
        <NavBar />
      </div>
      <div className="row d-flex align-items-center">
        <div className="mx-5 my-5 py-5 px-5">
          <p className="lead text-center">You are already a supporter :) Thanks!</p>
        </div>
      </div>
    </div>
  )
}
