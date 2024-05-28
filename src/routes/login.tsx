import type { FunctionComponent } from '../common/types';
import { createFileRoute } from '@tanstack/react-router';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { pipe, minLength, string, pipeAsync, checkAsync } from 'valibot';
import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/react-form';
import { useAuthStore } from '../store/auth';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? '' : null}
    </>
  );
}

const Login = (): FunctionComponent => {
  const login = useAuthStore((state) => state.login);

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      login(value.email, value.password);
    },
    validatorAdapter: valibotValidator
  });
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="w-full max-w-xs">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                //className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit();
                }}
              >
                <div className="mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" /> */}
                  <Field
                    name="email"
                    validators={{
                      onChange: pipe(
                        string(),
                        minLength(3, 'Username must be at least 3 characters')
                      ),
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: pipeAsync(
                        string(),
                        checkAsync(async (value) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return !value.includes('error');
                        }, "No 'error' allowed in Username")
                      )
                    }}
                    children={(field) => {
                      // Avoid hasty abstractions. Render props are great!
                      return (
                        <>
                          <Label
                            //className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor={field.name}
                          >
                            Username
                          </Label>
                          <Input
                            //className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <FieldInfo field={field} />
                        </>
                      );
                    }}
                  />
                </div>
                <div className="mb-6">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                  <Field
                    name="password"
                    validators={{
                      onChange: pipe(
                        string(),
                        minLength(3, 'Password must be at least 3 characters')
                      ),
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: pipeAsync(
                        string(),
                        checkAsync(async (value) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return !value.includes('error');
                        }, "No 'error' allowed in password")
                      )
                    }}
                    children={(field) => {
                      // Avoid hasty abstractions. Render props are great!s
                      return (
                        <>
                          <Label
                            //className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor={field.name}
                          >
                            Password
                          </Label>
                          <Input
                            //className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <FieldInfo field={field} />
                        </>
                      );
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        variant="outline"
                        //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? '...' : 'Sign In'}
                      </Button>
                    )}
                  />
                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a> */}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* <p className="text-center text-gray-500 text-xs">
                        &copy;2020 Acme Corp. All rights reserved.
                    </p> */}
      </div>
    </>
  );
};

export const Route = createFileRoute('/login')({
  component: Login
});
